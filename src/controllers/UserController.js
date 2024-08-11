const UserService = require('../services/UserService');

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;

        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // Kiểm tra định dạng email hợp lệ

        const isCheckEmail = reg.test(email);
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All inputs are required',
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid email format',
            });
        } else if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Password and confirmPassword must match',
            });
        }

        const response = await UserService.createUser(req.body);
        return res.status(201).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // Kiểm tra định dạng email hợp lệ

        const isCheckEmail = reg.test(email);
        if (!email || !password) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Email and password are required',
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid email format',
            });
        }

        const response = await UserService.loginUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'User ID is required',
            });
        }
        console.log('id:', id);
        const response = await UserService.updateUser(id, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'User ID is required',
            });
        }
        console.log('id:', id);
        const response = await UserService.deleteUser(id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
};
