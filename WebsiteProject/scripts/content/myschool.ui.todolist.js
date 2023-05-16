$(document).ready(function () {
    loadTodoList();

    $('#todo_add').on('click', function () {
        let todoValue = $('#todo_newitem').val();
        let dateCreated = new Date();
        let formattedDate = dateCreated.getDate().toString().padStart(2, '0') + '/' + (dateCreated.getMonth() + 1).toString().padStart(2, '0') + '/' + dateCreated.getFullYear() + ' ' + dateCreated.getHours().toString().padStart(2, '0') + ':' + dateCreated.getMinutes().toString().padStart(2, '0');
        if (todoValue !== '' && $('#todolistitems').children().length < 30) {
            let newTodo = `<li class="todo"><input type="checkbox" class="done" value="true"><div class="text_wrapper"><div>${$('<div>').text(todoValue).html()}</div><div class="date_created">${formattedDate}</div></div><a href="#" class="todo_delete link_delete">x</a></li>`;
            $('#todolistitems').append(newTodo);
            $('#todo_newitem').val('');
            saveTodoList();
        }
    });

    $(document).on('click', '.todo_delete', function (e) {
        e.preventDefault();
        $(this).parent().remove();
        saveTodoList();
    });

    $(document).on('change', '.done', function () {
        $(this).siblings('.text_wrapper').toggleClass('todo_strikeout');
        $(this).siblings('.text_wrapper').find('.date_created').toggleClass('todo_strikeout');
        saveTodoList();
    });

    function loadTodoList() {
        let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        $('#todolistitems').html(todoList.join(''));
        $('.done').each(function () {
            if ($(this).attr('checked')) {
                $(this).prop('checked', true);
                $(this).siblings('.text_wrapper').addClass('todo_strikeout');
                $(this).siblings('.text_wrapper').find('.date_created').addClass('todo_strikeout');
            }
        });
        document.cookie = "todoList=" + encodeURIComponent(todoList.join('')) + "; path=/";
    }

    function saveTodoList() {
        let todoList = $('#todolistitems').children().map(function () {
            let checkbox = $(this).find('.done');
            if (checkbox.prop('checked')) {
                checkbox.attr('checked', '');
            } else {
                checkbox.removeAttr('checked');
            }
            return $(this).prop('outerHTML');
        }).get();
        localStorage.setItem('todoList', JSON.stringify(todoList));
        document.cookie = "todoList=" + encodeURIComponent(todoList.join('')) + "; path=/";
    }
});
