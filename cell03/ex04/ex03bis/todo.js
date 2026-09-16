$(document).ready(function() {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    function saveTodos() {
        const todos = [];
        $('.todo-item').each(function() {
            todos.push($(this).text());
        });
        document.cookie = `ft_list=${encodeURIComponent(JSON.stringify(todos))};path=/;max-age=31536000`;
    }

    function createTodo(text) {
        const $todo = $('<div></div>').addClass('todo-item').text(text);
        $todo.click(function() {
            if (confirm('Do you want to remove this TO DO?')) {
                $(this).remove();
                saveTodos();
            }
        });
        $('#ft_list').prepend($todo);
    }

    const cookieData = getCookie('ft_list');
    if (cookieData) {
        try {
            const todos = JSON.parse(decodeURIComponent(cookieData));
            todos.reverse().forEach(text => createTodo(text));
        } catch (e) {
            console.error('Failed to parse cookies', e);
        }
    }

    $('#new_btn').click(function() {
        const text = prompt('Enter a new TO DO:');
        if (text && text.trim() !== '') {
            createTodo(text.trim());
            saveTodos();
        }
    });
});