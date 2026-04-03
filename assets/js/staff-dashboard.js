document.addEventListener('DOMContentLoaded', () => {
    // 1. Kiểm tra đăng nhập
    const staffToken = localStorage.getItem('staffToken');
    const staffUser = JSON.parse(localStorage.getItem('staffUser'));

    if (!staffToken || !staffUser) {
        window.location.href = 'staffLogin.html';
        return;
    }

    // 2. Cập nhật thông tin nhân viên
    const staffNameElem = document.querySelector('.text-xs.font-bold.text-gray-700');
    if (staffNameElem) staffNameElem.textContent = staffUser.name;

    // 3. Giả lập số liệu Dashboard
    const totalOrdersElem = document.querySelector('h4.text-4xl.font-black');
    if (totalOrdersElem) totalOrdersElem.textContent = Math.floor(Math.random() * 500 + 100);

    const alertStockElem = document.querySelector('h5.text-5xl.font-black');
    if (alertStockElem) alertStockElem.textContent = '05';

    // 4. Xử lý Đăng xuất
    const logoutBtn = document.querySelector('button.w-full.text-left.px-4.py-2.text-xs.text-gray-400');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            localStorage.removeItem('staffToken');
            localStorage.removeItem('staffUser');
            window.location.href = 'staffLogin.html';
        };
    }
});
