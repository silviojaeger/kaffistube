//global variables
var actualDate = 0; //Day as intiger
var justSubmitted = false;

//Button EventListener
document.getElementById("16.11").addEventListener("click",function(){
    startWriting(16);
});
document.getElementById("17.11").addEventListener("click",function(){
    startWriting(17);
});
document.getElementById("24.11").addEventListener("click",function(){
    startWriting(24);
});

document.getElementById("finishBtn").addEventListener("click",function(){
    cleanTables();
    loadAll();
});

//onload
$(function(){
    cleanTables();
    loadAll(); 
 });

function loadAll(){
    // Get the Cakes
    $.ajax({
        url: "/cake",
        type: "GET",
        dataType: "json"
    }).done((json) => {
        $.each(json, (key, value) => {
            appendCake(value);
        });
    });
}

//Clean the lists.....nice and clean it is
function cleanTables(){
    $("#16112018>tr").remove();
    $("#17112018>tr").remove();
    $("#24112018>tr").remove();
}

//append to list
function appendCake(value){
    let actId = '#'+value.date;
    let actNumber = $(actId+'>tr').length;      //Realy Pro method: Counts 'tr' elements in table...REALY ADVANCED LEVEL!
    let tablerow = `<tr>
                        <th>${(actNumber+1)}</th>
                        <td>${value.name}</td>
                        <td>${value.art}</td>
                        <td>${value.notes}</td>
                    </tr>`
    $(actId).append(tablerow);
}

//Open MODAL for the Form
function startWriting(date){
    actualDate = date; 
    document.getElementById('dateName').innerHTML = 'Einschreiben für den '+date+'.11.2018';
    
}


//HTTP POST to server
function sendToServer(){
    let myJson = new Object();
    myJson.name = $('#exampleInputName').val();
    myJson.art = $('#exampleFormControlSelect1').val();
    myJson.date = actualDate+'112018';
    myJson.mail = $('#exampleInputMail').val();
    myJson.notes = $('#exampleInputNotes').val();

    $.ajax({
        url: '/cake',
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(myJson),
        processData: false,
    }).always(function(){
        justSubmitted = true;
        $('#exampleModalCenter').modal('toggle');
    });
}


//Open the thankyoumodal
$('#exampleModalCenter').on('hidden.bs.modal', function () {
    console.log('OPEN THE THANKYOUMODAL');
    if(justSubmitted){
        $('#thankyoumodal').modal('toggle');
    }
    justSubmitted = false;
})

//when somene click the modal away! Wer ready for that dude
$('#thankyoumodal').on('hidden.bs.modal', function () {
    cleanTables();
    loadAll();
})