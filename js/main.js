let links = [];
links.push(...document.querySelectorAll("nav a"));
console.log(links);
let pages = [
  document.querySelector("#home"),
  document.querySelector("#Skills"),
  document.querySelector("#projects"),
  document.querySelector("#contactMe"),
];
window.onload = () => {
  pages.forEach((li, index) => {
    if (index === 0) {
      li.style.display = "block";
    } else {
      li.style.display = "none";
    }
  });
  links.forEach((li, index) => {
    if (index === 0) {
      li.className = " active";
    } else {
      li.className = "";
    }
  });
};
function removeActive() {
  links.map((li) => {
    if (li.classList.contains("active")) {
      li.classList.remove("active");
    }
  });
}
links.forEach((li) => {
  li.onclick = () => {
    pages.map((item) => {
      item.style.display = "none";
    });
    removeActive();
    document.querySelector(li.getAttribute("href")).style.display = "block";
    li.className += " active";
  };
});
let mainSkillsElement = document.querySelector("#Skills .main ");
fetch("./Api/db.json")
  .then((res) => res.json())
  .then((data) => {
    printMainSkills(data.skills);
    printOtherSkills(data.otherSkills);
    printEducationItem(data.Education);
    printContactMeItem(data.Contact);
    printProjectMe(data.projects);
  });
function printMainSkills(data) {
  data.map((item) => {
    let elSkill = document.createElement("div");
    elSkill.className = "skill";
    setTimeout(() => {
      elSkill.style = `--range:` + item.rank;
    }, 2000);

    let skillName = document.createElement("div");
    skillName.className = "skill-name";
    skillName.innerText = item.name;
    elSkill.appendChild(skillName);
    mainSkillsElement.appendChild(elSkill);
  });
}
let otherSkillsElement = document.querySelector("#Skills .other");

function printOtherSkills(data) {
  data.map((item) => {
    let otherSkillElement = document.createElement("div");
    otherSkillElement.className = "other-skills";
    otherSkillElement.innerText = item;
    otherSkillsElement.appendChild(otherSkillElement);
  });
}
let educationElement = document.querySelector("#Skills .edu");
function printEducationItem(data) {
  data.map((item) => {
    let icon = document.createElement("i");
    icon.className = "fa fa-paperclip fa-2x";
    let educationItemElement = document.createElement("div");

    educationItemElement.className = item.done
      ? "education-item done"
      : "education-item undone";
    let detailsElement = document.createElement("div");
    detailsElement.className = "education-details";
    let dateElement = document.createElement("div");
    dateElement.className = "education-date";
    dateElement.innerText = item.date;
    let nameElement = document.createElement("div");
    nameElement.className = "education-name";
    nameElement.innerText = item.name;
    detailsElement.appendChild(nameElement);
    detailsElement.appendChild(dateElement);
    educationItemElement.appendChild(icon);
    educationItemElement.appendChild(detailsElement);
    educationElement.appendChild(educationItemElement);
  });
}
let contactMe = document.querySelector("#contactMe .container ");
function printContactMeItem(data) {
  data.map((item) => {
    let contactMeItem;
    if (item.link) {
      contactMeItem = document.createElement("a");
      contactMeItem.href = item.link;
    } else {
      contactMeItem = document.createElement("div");
    }
    let iconContact = document.createElement("i");
    iconContact.className = "fa fa-brands fa-" + item.name + " fa-4x";
    if (item.link) {
      iconContact.style.color = item.color;
    } else {
      iconContact.style.color = "#333";
    }
    contactMeItem.appendChild(iconContact);
    contactMe.appendChild(contactMeItem);
  });
}
let myProjects = document.querySelector("#projects .container");
function printProjectMe(data) {
  for (let i = 0; i < data.length; i++) {
    let card = document.createElement("div");
    card.className = "col-sm-2";
    let cardImg = document.createElement("img");
    cardImg.className = "card-image-top";
    cardImg.src =   data[i].img;
    let languages = document.createElement("div");
    languages.className = "lang";
    languages.innerHTML = data[i].languages.toString();
    let cardName = document.createElement("a");
    cardName.className = " header";
    cardName.href = data[i].link;
    cardName.innerHTML = data[i].name;
    let description = document.createElement("div");
    description.className = "desc";
    description.innerHTML = data[i].description;
    card.append(cardImg);
    card.append(cardName);

    card.append(description);
    card.append(languages);
    let row = document.createElement("div");
    row.className = "row";
    row.append(card);
    myProjects.append(row);
  }
}
