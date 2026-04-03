// api.js - Senior Standard (Mock Auth System)

// Khởi tạo "Database người dùng" trong localStorage nếu chưa có
if (!localStorage.getItem('mock_users')) {
    const defaultUsers = [
        { email: 'admin@shop.com', password: 'password', name: 'Shop Admin', role: 'admin' },
        { email: 'test@gmail.com', password: '123', name: 'Tester', role: 'customer' }
    ];
    localStorage.setItem('mock_users', JSON.stringify(defaultUsers));
}

async function fetchData(endpoint, options = {}) {
    console.log(`[API Request] ${endpoint}`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Giả lập độ trễ

    const users = JSON.parse(localStorage.getItem('mock_users'));

    // 1. Logic Đăng ký
    if (endpoint === '/auth/register') {
        const newUser = JSON.parse(options.body);
        
        if (users.find(u => u.email === newUser.email)) {
            throw new Error('Email này đã được đăng ký!');
        }

        users.push({ ...newUser, role: 'customer' });
        localStorage.setItem('mock_users', JSON.stringify(users));
        return { message: 'Đăng ký thành công!' };
    }

    // 2. Logic Đăng nhập
    if (endpoint === '/auth/login') {
        const { email, password } = JSON.parse(options.body);
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            throw new Error('Email hoặc mật khẩu không chính xác!');
        }

        return { 
            token: 'mock-jwt-' + Math.random(), 
            user: { name: user.name, email: user.email, role: user.role } 
        };
    }

    // 3. Lấy sản phẩm (từ file data đã load)
    if (endpoint === '/products') return typeof MOCK_PRODUCTS !== 'undefined' ? MOCK_PRODUCTS : [];
    
    if (endpoint.startsWith('/products/')) {
        const id = parseInt(endpoint.split('/').pop());
        const product = MOCK_PRODUCTS.find(p => p.id === id);
        if (product) return product;
        throw new Error('Sản phẩm không tồn tại');
    }

    if (endpoint === '/orders') return { message: 'Success', orderId: Date.now() };

    throw new Error('Endpoint không hợp lệ');
}
