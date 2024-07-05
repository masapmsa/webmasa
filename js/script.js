//preloader script ////////////////////
window.addEventListener('load', function() {
    document.getElementById('preloader').style.display = 'none';
    document.querySelector('.page-wrapper').style.display = 'block';
 });
 
 //portfolio script ////////////////////
 document.addEventListener("DOMContentLoaded", function () {
    const filterBtns = document.querySelectorAll("[data-filter-btn]");
    const select = document.querySelector("[data-select]");
    const selectItems = document.querySelectorAll("[data-select-item]");
    const selectValue = document.querySelector("[data-select-value]");
    const filterItems = document.querySelectorAll("[data-filter-item]");
  
    // Set initial value for select dropdown
    selectValue.innerText = "All";
    filterItemsByCategory("all");
  
    // Toggle select dropdown visibility
    select.addEventListener("click", function () {
      this.nextElementSibling.classList.toggle("active");
      this.querySelector(".select-icon").classList.toggle("active");
    });
  
    // Handle selection of a specific category from dropdown
    selectItems.forEach(item => {
      item.addEventListener("click", function () {
        let selectedValue = this.innerText.trim().toLowerCase();
        selectValue.innerText = this.innerText.trim();
        filterItemsByCategory(selectedValue);
        closeSelectDropdown();
      });
    });
  
    // Handle filter button click for large screens
    filterBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        let selectedValue = this.innerText.trim().toLowerCase();
        filterItemsByCategory(selectedValue);
        setActiveFilterButton(this);
      });
    });
  
    // Function to filter items by category
    function filterItemsByCategory(category) {
      filterItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category").toLowerCase();
        if (category === "all" || category === itemCategory) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }
  
    // Function to close select dropdown
    function closeSelectDropdown() {
      select.nextElementSibling.classList.remove("active");
      select.querySelector(".select-icon").classList.remove("active");
    }
  
    // Function to set active filter button
    function setActiveFilterButton(button) {
      filterBtns.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    }
  });
  
//testimonial animation ////////////////
const image = document.querySelector('.image');
const feedback = document.querySelector('.feedback');
const users = [
    {
        name: 'Tanya Sinclair',
        role: 'UX Engineer',
        feedback: '“ I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. ”',
        image: 'assets/pg1.jpg'
    },
    {
        name: 'John Tarkpor',
        role: 'Junior Front-end Developer',
        feedback: '“ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. ”',
        image: 'assets/pg2.jpg'
    }
];
let slide = 0;
const navigation = (index) => {
    slide = index !== undefined ? index : slide;
    if (slide >= users.length) {
        slide = 0;
    } else if (slide < 0) {
        slide = users.length - 1;
    }
    image.innerHTML = `    
        <img src="${users[slide].image}" alt="">
    `;
    feedback.innerHTML = `
        <img src="assets/pattern-quotes.svg" alt="">
        <p>${users[slide].feedback}</p>
        <h4 class="name">${users[slide].name} <span class="role">${users[slide].role}</span></h4>
    `;
    // Update radio button state
    document.getElementById(`testimonial${slide + 1}`).checked = true;
};
// Initial slide
navigation();
// Auto slide every 5 seconds
let autoSlide = setInterval(() => {
    slide++;
    navigation();
}, 5000);

document.querySelectorAll('.testimonial-radio').forEach((radio, index) => {
    radio.addEventListener('click', () => {
        clearInterval(autoSlide);
        navigation(index);
        autoSlide = setInterval(() => {
            slide++;
            navigation();
        }, 5000);
    });
});

//contact send //////////////////////
const form = document.querySelector('form');
const fullName = document.getElementById('name');
const phone = document.getElementById('phone');
const sub = document.getElementById('subject');
const text = document.getElementById('textarea');

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Phone: ${phone.value}<br> Subject: ${text.value}`;
    Email.send({
        SecureToken: "b7e1cefb-8dd1-477d-9397-d00d1079cb8f",
        Username: "fest.masa2024@gmail.com",
        Password: "5FF5580EC1CB7E3192ED5C4CEBF746E411CD",
        To: 'fest.masa2024@gmail.com',
        From: "fest.masa2024@gmail.com",
        Subject: sub.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Thank You!",
                    text: "Feedback send successfully!",
                    icon: "success"
                });
            }
        }
    );
}

function checkinputs() {
    const items = document.querySelectorAll(".input");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add('error');
            item.parentElement.classList.add('error');
        }
        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkinputs();
    if (!fullName.classList.contains("error") && !phone.classList.contains("error") && !sub.classList.contains("error") && !text.classList.contains("error")) {
        sendEmail();
        form.reset();
        return false;
    }
});