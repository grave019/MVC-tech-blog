$(function () {
    const titleInput = $("#post-title");
    const contentInput = $("#post-content");
    const postBtn = $("#create");
    const updateBtn = $("#update");
    const deleteBtn = $("#delete");
    const toastDiv = $(".toast-add");
    const toastUpdate = $(".toast-update");
// function for creating a post
    const postSubmitHandler = () => {
        const title = titleInput.val().trim();
        const content = contentInput.val().trim();

        $.ajax({
            method: "POST",
            url: "/api/post",
            data: { title, content },
            complete: function () {
                let toast = new bootstrap.Toast(toastDiv);
                toast.show();
            },

        });
    };