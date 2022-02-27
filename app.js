const template = document.getElementById("template");
const fragment = document.createDocumentFragment();
const form = document.querySelector(".form");
const commentsContainer = document.getElementById("comments-container");
let allComments = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveData(e.target[0].value);
  form.reset();
});

const saveData = (msg) => {
  const comment = {
    uid: crypto.randomUUID(),
    message: msg,
    likes: 0,
    replies: [],
  };
  allComments = [...allComments, comment];
  console.log(allComments);
  paintComment(comment);
};

const paintComment = (comment) => {
  //template
  const template = document.getElementById("template").content;
  const templateClone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();

  templateClone.querySelector(".comment__text").textContent = comment.message;
  templateClone.querySelector(".aside__count").textContent = comment.likes;
  templateClone.querySelector(".reply").dataset.uid = comment.uid;
  templateClone.querySelector(".reply__img").dataset.uid = comment.uid;
  fragment.appendChild(templateClone);
  commentsContainer.appendChild(fragment);
};
