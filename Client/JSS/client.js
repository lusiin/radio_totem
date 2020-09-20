const form = document.querySelector('form');
const loadingElement = document.querySelector(".loading");
const API_URL = "https://client-tan-chi.vercel.app";

const schliessen = document.querySelector(".container");
      
loadingElement.style.display = "";

var counter =0;

listAllPosts();


/*schliessen.addEventListener("close", (event)=>{
    event.preventDefault();
    console.log("closed");
    var element = document.querySelector(".container");
    var textx = document.getElementById("1");
    element.style.display = "none";
    textx.style.display = "none";

});*/

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    const x = 700;
    const y = 650;
    
    const post = {
        name,
        content,
        x,
        y
    };
    
    form.style.display = "none";
    loadingElement.style.display= "";
    
    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())
    .then(createdPost => {
        console.log(createdPost);
        form.reset(); 
        setTimeout (() =>{
            
            form.style.display ="";
        }, 30000);
        form.style.display = "";
        addContent(createdPost.name, createdPost.content, createdPost.x);
        loadingElement.style.display = "none";
    });
    
});

function listAllPosts(){
    fetch(API_URL)
        .then(response => response.json())
        .then(posts => {
            //console.log(posts.name);
            posts.forEach(post => {
                addContent(post.name, post.content);
                
                var infocontainer = document.querySelector(".container");
                var innerDiv = document.createElement('infobox');
                innerDiv.id = counter;
                infocontainer.appendChild(innerDiv);

                var infotext = document.createElement("p");
                innerDiv.appendChild(infotext);
                infotext.textContent = post.name;
                
                counter++;
                
                
                
                

                /*    
                var newText = document.createElement("p")
                z.innerHTML = post.name;
                
                newText.appendChild(z);*/

            });
            loadingElement.style.display = "none";
        });

}