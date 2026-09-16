const leftInput = document.getElementById('left');
const opSelect = document.getElementById('op');
const rightInput = document.getElementById('right');
const btn = document.getElementById('btn');

// ตรวจสอบว่าอินพุตเป็นจำนวนเต็มบวกหรือศูนย์เท่านั้น (>= 0)
function isNonNegativeInteger(str) {
    return /^\d+$/.test(str.trim());
}

btn.addEventListener('click', () => {
    const leftVal = leftInput.value.trim();
    const rightVal = rightInput.value.trim();

    // ถ้าไม่ใช่จำนวนเต็มบวก หรือช่องว่าง ให้ขึ้น Error :(
    if (!isNonNegativeInteger(leftVal) || !isNonNegativeInteger(rightVal)) {
        alert('Error :(');
        return;
    }

    const left = parseInt(leftVal, 10);
    const right = parseInt(rightVal, 10);
    const op = opSelect.value;

    // ถ้าหาร หรือ Modulo ด้วย 0
    if ((op === '/' || op === '%') && right === 0) {
        alert("It's over 9000!");
        console.log("It's over 9000!");
        return;
    }

    let result;
    switch (op) {
        case '+': result = left + right; break;
        case '-': result = left - right; break;
        case '*': result = left * right; break;
        case '/': result = left / right; break;
        case '%': result = left % right; break;
    }

    alert(result);
    console.log(result);
});

// แจ้งเตือนทุกๆ 30 วินาที
setInterval(() => {
    alert('Please, use me...');
}, 30000);