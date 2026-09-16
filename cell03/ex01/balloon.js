const balloon = document.getElementById('balloon');
const colors = ['red', 'green', 'blue'];

let size = 200;
let colorIndex = 0;

function render() {
    balloon.style.width = size + 'px';
    balloon.style.height = size + 'px';
    balloon.style.backgroundColor = colors[colorIndex];
}

// เมื่อคลิก: ขยายใหญ่ขึ้น 10px และเปลี่ยนสีตามลำดับ (Red -> Green -> Blue)
balloon.addEventListener('click', () => {
    size += 10;
    colorIndex = (colorIndex + 1) % colors.length;

    // ถ้าระเบิด (ขนาด > 420px) ให้รีเซ็ตกลับเป็นขนาด 200px และสีเริ่มต้น (Red)
    if (size > 420) {
        size = 200;
        colorIndex = 0;
    }

    render();
});

// เมื่อเมาส์ออกจากลูกโป่ง: หดลง 5px (ไม่ต่ำกว่า 200px) และเปลี่ยนสีย้อนกลับ
balloon.addEventListener('mouseleave', () => {
    if (size > 200) {
        size -= 5;
        colorIndex = (colorIndex - 1 + colors.length) % colors.length;
    }

    render();
});