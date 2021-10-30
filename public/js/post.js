$(function () {
    const titleInput = $("#post-title");
    const contentInput = $("#post-content");
    const postBtn = $("#create");
    const updateBtn = $("#update");
    const deleteBtn = $("#delete");
    const toastDiv = $(".toast-add");
    const toastUpdate = $(".toast-update");
// function to create a post
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
    // function to edit a post
    const postUpdateHandler = () => {
        const title = titleInput.val().trim();
        const content = contentInput.val().trim();
        let url = $(location).attr("href");
        let id = url.split("/").at(-1);

        $.ajax({
            method: "PUT",
            url: `/api/post/${id}`,
            data: { title, content },
            complete: function () {
                let toast = new bootstrap.Toast(toastUpdate);
                toast.show();
            },

        });
    };
    // function to delete a post
    const postDeleteHandler = () => {
        let url = $(location).attr("href");
        let id = url.split("/").at(-1);

        $.ajax({
            method: "DELETE",
            url: `/api/post/${id}`,
            complete: function () {
                location.replace("/dashboard");
            },

        });

    };
    const confirmDelete = () => {
        const conDelete = confirm("Are you sure you would like to delete your post?");
        if (conDelete) {
            postDeleteHandler();
        } else {
            return;
        } 
    };