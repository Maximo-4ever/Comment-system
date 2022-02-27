const form = document.querySelector(".form");
const commentsContainer = document.getElementById("comments-container");
let allComments = [{
  uid: crypto.randomUUID(),
  message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates modi nulla aspernatur ratione, dignissimos fuga, itaque voluptatem fugit facilis beatae sapiente eligendi alias dolorum minima. Animi ducimus vero eum iusto!",
  likes: 7,
  replies: [],
}];
let parentComment;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveData(e.target[0].value);
  form.reset();
});

const saveData = (msg, uid = "") => {
  const comment = {
    uid: crypto.randomUUID(),
    message: msg,
    likes: 0,
    replies: [],
  };
  if (uid === "") {
    allComments = [...allComments, comment];
    paintComment(comment);
  } else {
    commentFilter = allComments.filter((item) => item.uid === uid);
    commentFilter.replies = comment;
    paintComment(commentFilter.replies);
  }
};

const paintComment = (comment) => {
  //template
  const templateComment = document.getElementById("templateComment").content;
  const templateClone = templateComment.cloneNode(true);
  const templateReply = templateComment .cloneNode(true).querySelector(".replyCommentContainer");
  // Comment content
  templateClone.querySelector(".main-comment").dataset.uid = comment.uid;
  templateClone.querySelector(".comment__text").textContent = comment.message;
  templateClone.querySelector(".aside__count").textContent = comment.likes;
  // Si es un comentario de respuesta:
  if (parentComment) {
    templateReply.appendChild(templateClone);
    parentComment.appendChild(templateReply);
    parentComment = false;
  } else {
    commentsContainer.appendChild(templateClone);
  }
};

// Delegacion de eventos ("Click")
commentsContainer.addEventListener("click", (evt) => {
  const target = evt.target;
  const templateForm = document.getElementById("templateForm").content;
  const formReply = templateForm.cloneNode(true).querySelector(".form");
  // Si target es reply
  if (target.className === "reply" || target.className === "reply__img") {
    target.className === "reply"
      ? commentContainer = target.parentElement.parentElement.parentElement
      : commentContainer = target.parentElement.parentElement.parentElement.parentElement;
    // Inserta el formulario 
    insertAfter(formReply, commentContainer.parentElement);
  }
  // Si target es submit Form
  if (target.classList.contains("form__btn--reply")) {
    evt.preventDefault();
    const inputValue = target.previousElementSibling.value;
    parentComment = target.parentElement.previousElementSibling;
    saveData(inputValue, parentComment.dataset.uid);

    // Elimina el formReply
    target.parentNode.parentNode.removeChild(target.parentNode);
  }
});

// Insertar formReply
const insertAfter = (newNode, parentNode) => parentNode.after(newNode);

paintComment(allComments[0])