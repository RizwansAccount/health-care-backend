import { CodeServiceModel, UserModel } from "../models/index.js";
import passwordHash from 'password-hash';
import jwt from 'jsonwebtoken';
import config from '../../../../config/index.js';
import { transporterEmail, getMailOptions, getRandomCode } from '../../../../utils/index.js';

export const UserService = {
    getAll: async () => {
        return await UserModel.find({}, {password : 0});
    },

    getById: async (id) => {
        return await UserModel.findOne({ _id: id });
    },

    create: async (body) => {
        let { password } = body;
        password = passwordHash?.generate(password);
        return await UserModel.create({ ...body, password });
    },

    update: async (id, body) => {
        return await UserModel.findByIdAndUpdate(id, body);
    },

    delete: async (id) => {
        return await UserModel.findByIdAndDelete(id);
    },

    login: async (body) => {
        const { email, password } = body;
        const user = await UserModel.findOne({ email: email });

        if (!user) { throw new Error("user does not exist!") };

        const isPasswordValid = passwordHash.verify(password, user?.password);

        if (!isPasswordValid) { throw new Error('invalid password!'); }

        const token = jwt.sign({ email: user?.email }, config.env.jwtSecret);

        return { token, user_id: user?._id, email: user?.email };
    },

    verifyCode: async (body) => {
        const { email, verification_code } = body;
        const userData = await CodeServiceModel.findOne({ email, verification_code });

        if (!userData || userData?.verification_code != verification_code) {
            throw new Error("Invalid verification code!");
        };

        await CodeServiceModel.updateOne({ email }, { verification_code, status: 'verified' });
        return { message: 'verified successfully!' };
    },

    forgotPassword: async (body) => {
        const MessageService = transporterEmail();
        const { email } = body;

        const isAccountExist = await UserModel.findOne({ email });

        if (!isAccountExist) { throw new Error("account not exists") };

        const verification_code = getRandomCode();

        await CodeServiceModel.create({ email, verification_code, status: 'not-verified' });

        const mailOptions = getMailOptions(isAccountExist?.email, verification_code);

        MessageService.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error("some error in validation!")
            }
            return {};
        });

    },

    resendCode: async (body) => {
        const MessageService = transporterEmail();
        const { email } = body;

        const isAccountExist = await UserModel.findOne({ email });

        if (!isAccountExist) { throw new Error("account not exists") };

        const isAlreadyCodeExist = await CodeServiceModel.findOne({ email });

        const verification_code = getRandomCode();

        if (isAlreadyCodeExist) {
            await CodeServiceModel.findOneAndUpdate({ email }, { verification_code, status: 'not-verified' });
        } else {
            await CodeServiceModel.create({ email, verification_code, status: 'not-verified' });
        }

        const mailOptions = getMailOptions(isAccountExist?.email, verification_code);

        MessageService.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error("some error in validation!")
            }
            return {};
        });

    },

    newPassword: async (body) => {
        const { email, password } = body;
        const isUserVerified = await CodeServiceModel.findOne({ email: email, status: 'verified' })
        if (!isUserVerified) {
            throw new Error("code not verified")
        };
        if (!password) {
            throw new Error("password must be filled!")
        };
        const hashedPassword = passwordHash.generate(password);
        await UserModel.findOneAndUpdate({ email }, { password: hashedPassword });
        await CodeServiceModel.deleteMany({ email });
        return {
            message: 'password updated successfully!'
        }
    },

    changePassword: async (body) => {
        const { email, password, new_password } = body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new Error("user does not exist!");
        }

        const isPreviousPasswordMatched = passwordHash.verify(password, user?.password);

        if (!isPreviousPasswordMatched) {
            throw new Error("you cannot change your password, your previous password not matched!");
        }

        const newHashPassword = passwordHash?.generate(new_password);

        await UserModel.findOneAndUpdate({ email }, { password: newHashPassword });

        return { message: 'Password changed successfully!' }

    }
};