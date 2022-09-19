let title = document.getElementById('title')
let note = document.getElementById('note');
let sbtn = document.getElementById('sbtn');
let notesContainer = document.getElementById('notesContainer');
let alrt = document.getElementById("alert")



let html = '';

function deleteNote(id) {
    url = `https://notes-taker-api-project.herokuapp.com/${id}`

    params = {
        method: 'delete'
    }
    fetch(url, params).then(response => response.json()).then(data => {
        if (data.acknowledged) {
            window.location.reload();
        }
    })
}

function updateData(id, d) {
    url = `https://notes-taker-api-project.herokuapp.com/${id}`

    params = {
        method: 'put',
        headers: {
            "Content-Type": "application/json",
        },
        body: d
    }
    fetch(url, params).then(response => response.json()).then(data => {
        window.location.reload();
    })
}

function getData() {
    url = 'https://notes-taker-api-project.herokuapp.com/'
    fetch(url).then((resp) => {
        return resp.json();
    }).then((data) => {
        data.forEach(element => {
            html = html +
                ` <div class="card my-4" style="width: 100%;">
                <div class="card-body">
                    <h5 class="bold">${element.title}</h5>
                    <p class="card-text">${element.note}</p>
                    <hr>
                    <div id="${element._id}a" class="alert alert-danger d-none" role="alert">
                        Enter updated Note First !!!
                    </div>
                    <div id="${element._id}btn"  class='d-none updated'>
                    <div class="input-group mb-3">
                        <input id="${element._id}t" type="text" class="form-control" placeholder="Updated Title" aria-label="Username"
                            aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <input id="${element._id}n" type="text" class="form-control" placeholder="Updated Note" aria-label="Username"
                            aria-describedby="basic-addon1">
                    </div>
                    <button id='${element._id}d' class="done btn btn-primary mx-3 ">Done</button>
                    </div>
                    <div class="btn-container">
                        <button id='${element._id}' class="editBtn btn btn-success mx-3 ">Edit Note</button>
                        <button id='${element._id}' class="deleteBtn btn btn-danger mx-3 ">Delete Note</button>
                    </div>
                </div>
            </div>`;

        });
        notesContainer.innerHTML = html;

        let deleteBtn = document.getElementsByClassName('deleteBtn');
        Array.from(deleteBtn).forEach(ele => {
            ele.addEventListener('click', (e) => {
                deleteNote(e.target.id)
            })
        })

        let editBtn = document.getElementsByClassName('editBtn');
        Array.from(editBtn).forEach(ele => {
            ele.addEventListener('click', (e) => {
                let id = e.target.id;
                let clickedDiv = document.getElementById(`${id}btn`)
                clickedDiv.classList.remove('d-none')

                let updatedTitle = document.getElementById(`${id}t`)
                let updatedNote = document.getElementById(`${id}n`)
                let clickedDone = document.getElementById(`${id}d`)
                let ualrt = document.getElementById(`${id}a`)

                clickedDone.addEventListener('click', () => {
                    if (updatedNote.value === '') {
                        ualrt.classList.remove('d-none')
                        setTimeout(() => {
                            ualrt.classList.add('d-none');
                        }, 3000);
                    }
                    else {
                        updatedData = `{
                        "title":"${updatedTitle.value}",
                        "note":"${updatedNote.value}"
                    }`
                        updateData(id, updatedData)
                        clickedDiv.classList.add('d-none')
                    }
                })
            })
        }
        )
    });

}


function postData(d) {
    url = 'https://notes-taker-api-project.herokuapp.com/'

    params = {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: d
    }
    fetch(url, params).then(response => response.json()).then(data => {
        window.location.reload();
    })
}

sbtn.addEventListener('click', () => {
    if (note.value === "") {
        alrt.classList.remove('d-none')
        setTimeout(() => {
            alrt.classList.add('d-none');
        }, 3000);
    }
    else {
        let data = `{
            "note":"${note.value}" ,
            "title":"${title.value}"
        }`
        postData(data);

        title.value = '';
        note.value = '';
    }
})

getData();



