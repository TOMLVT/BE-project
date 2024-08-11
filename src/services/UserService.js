const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('./jwtService');

const createUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = userLogin;
        try {
            // Check if email already exists
            const checkUser = await User.findOne({ email });
            if (checkUser) {
                return resolve({
                    status: 'ERR',
                    message: 'The email is already registered!',
                });
            }

            // Hash the password
            const hash = bcrypt.hashSync(password, 10);
            // Create user
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone,
            });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: createdUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const loginUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = newUser;
        try {
            // Check if user exists
            const checkUser = await User.findOne({ email });
            if (!checkUser) {
                return resolve({
                    status: 'ERR',
                    message: 'User not found!',
                });
            }

            // Compare password
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                return resolve({
                    status: 'ERR',
                    message: 'Incorrect email or password',
                });
            }

            // Generate tokens
            const access_token = await generateAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });

            const refresh_token = await generateRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });

            resolve({
                status: 'OK',
                message: 'Login successful',
                access_token,
                refresh_token,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check if user exists
            const checkUser = await User.findById(id);
            if (!checkUser) {
                return resolve({
                    status: 'ERR',
                    message: 'User not found!',
                });
            }

            // Update user
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'OK',
                message: 'User updated successfully',
                data: updatedUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check if user exists
            const checkUser = await User.findById(id);
            if (!checkUser) {
                return resolve({
                    status: 'ERR',
                    message: 'User not found!',
                });
            }

            // Delete user
            await User.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: 'User deleted successfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
};
