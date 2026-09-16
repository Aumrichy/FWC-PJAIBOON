const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('new_btn');

// โหลดข้อมูลจาก Cookies เมื่อเปิดหน้าเว็บ
window.onload = () => {
    const cookieData = getCookie('ft_list');
    if (cookieData) {
        try {
            const todos = JSON.parse(decodeURIComponent(cookieData));
            // แสดงผลเรียงจากตัวหลังสุดมาหน้าสุด เพื่อคงลำดับเดิมไว้
            todos.reverse().forEach(text => createTodo(text));
        } catch (e) {
            console.error('Failed to parse cookies', e);
        }
    }
};

// กดปุ่ม New เพื่อเปิดช่องรับข้อมูล prompt
newBtn.addEventListener('click', () => {
    const text = prompt('Enter a new TO DO:');
    if (text && text.trim() !== '') {
        createTodo(text.trim());
        saveTodos();
    }
});

// ฟังก์ชันสร้าง Element ของ TO DO
function createTodo(text) {
    const todo = document.createElement('div');
    todo.className = 'todo-item';
    todo.textContent = text;

    // คลิกเพื่อลบ พร้อมกล่องยืนยัน confirm
    todo.addEventListener('click', () => {
        if (confirm('Do you want to remove this TO DO?')) {
            todo.remove(); // ลบออกจาก DOM ถาวร
            saveTodos();
        }
    });

    // แทรกไว้ด้านบนสุดของ ft_list เสมอ
    ftList.prepend(todo);
}

// ฟังก์ชันบันทึกรายการลง Cookie
function saveTodos() {
    const todos = [];
    const items = ftList.querySelectorAll('.todo-item');
    items.forEach(item => todos.push(item.textContent));
    
    // บันทึกเป็น JSON String ใส่ Cookie
    document.cookie = `ft_list=${encodeURIComponent(JSON.stringify(todos))};path=/;max-age=31536000`;
}

// ฟังก์ชันดึงค่า Cookie ตามชื่อ
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}