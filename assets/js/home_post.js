{
    console.log("hey")

    let createPost = () => {
        let newPostForm = $('#newPostForm')



        newPostForm.submit((e) => {
            e.preventDefault();

            $.ajax({
                type: "POST",
                url: '/posts/createPost',
                data: newPostForm.serialize(),
                success: (data) => {
                    console.log(data)
                    let newPost = newPostDom(data.data.post)
                    $('#posts').prepend(newPost)
                    deletePost($(' .delete-post-btn', newPost))
                },
                error: (error) => {
                    console.log(error)
                }
            })

        })
    }

    

    let newPostDom = (post) => {
        return $(`<li class="post" id="post-${post._id}">
                    <div class="flex">
                        <div>
                            <h3>${post.name}</h3>
                            ${post.content}
                        </div>
                        <div>
                           
                                <a class="delete-post-btn" href="/posts/destroy/${post._id}">delete post</a>

                            
                        </div>
                    </div>
                    
                    <hr>
                        <button id="dropdown">Comments</button>
                        <ul id="comments" class="hidden">
                           

                            
                            <form action="/comments/addComment" method="POST" id="commentForm" >
                            <input name="content" type="text" placeholder="Add a comment" required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value=">">
                        </form>

                        </ul>

        </li>`)
    }

    let deletePost = (deleteLink)=>{
        $(deleteLink).click((e)=>{
            e.preventDefault()
            $.ajax({
                type: "GET",
                url: $(deleteLink).prop('href'),
                success: (data)=>{
                    $(`#post-${data.data.post_id}`).remove()

                },
                error: (error)=>{
                    console.log(error.responseText)
                }

            })
        })


    }


    let addComment = ()=>{


        let CommentForm = $('#commentForm')

        CommentForm.submit((e)=>{
            e.preventDefault()

            $.ajax({
                type: "POST",
                url : "/comments/addComment",
                data : CommentForm.serialize(),
                success: (data)=>{
                    console.log(data)
                    let newComment = commentDOM(data.data.comment)
                    $('#comments').prepend(newComment)
                    // deleteComment($(" .delete-comment-btn", newComment))
                },
                error : (error)=>{
                    console.log(error.responseText)
                }
            })
        })

            }
        
    

    let commentDOM = (comment)=>{

        return $(`<li class="flex" id="comment-${comment._id}">
        <p>
            ${comment.content}
                <small>
                    -${comment.name}
                </small>

        </p>
            <a class="delete-comment-btn" href="/comments/destroy/${comment._id}">X</a>

            

    </li>`)

    }


    let deleteComment = (deleteLink)=>{

        $(deleteLink).click((e)=>{
            e.preventDefault()
        })
        $.ajax({
            type: "GET",
            url : $(deleteLink).prop("href"),
            success : (data)=>{
                $(`#comment-${data.data.comment_id}`).remove()
            },
            error: (error)=>{
                console.log(error)
            }

        })

    }

    createPost()
    addComment()
    
}