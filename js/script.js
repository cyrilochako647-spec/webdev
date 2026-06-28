let button = document.getElementById("themeToggle");

if(button){
    button.onclick = function(){
        document.body.classList.toggle("light-mode");
    };
}

let forms = document.querySelectorAll("form");

forms.forEach(function(form){
    form.onsubmit = function(e){
        e.preventDefault();

        let inputs = form.querySelectorAll("[required]");
        let valid = true;

        inputs.forEach(function(input){
            if(input.value == ""){
                input.style.border = "2px solid red";
                valid = false;
            }else{
                input.style.border = "";
            }
        });

        if(valid){
            alert("Form submitted successfully!");
            form.reset();
        }
    };
});

let search = document.getElementById("movieSearch");

if(search){
    search.onkeyup = function(){
        let text = search.value.toLowerCase();
        let cards = document.querySelectorAll(".movie-card-wrapper");

        cards.forEach(function(card){
            let title = card.querySelector("h5").textContent.toLowerCase();

            if(title.includes(text)){
                card.style.display = "block";
            }else{
                card.style.display = "none";
            }
        });
    };
}