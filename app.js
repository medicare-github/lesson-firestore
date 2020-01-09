const studyList=document.querySelector('#cafe-list');
const form=document.querySelector('#add-cafe-form');

//create element and render study

function renderStudy(doc){
    let li=document.createElement('li');
    let name=document.createElement('span');
    let content=document.createElement('span');
    let cross=document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent=doc.data().name;
    content.textContent=doc.data().content;
    cross.textContent='x';

    li.appendChild(name);
    li.appendChild(content);
    li.appendChild(cross);

    studyList.appendChild(li);
    
    //delete data
    cross.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id=e.target.parentElement.getAttribute('data-id');
        db.collection('study').doc(id).delete();
    })
    
}
//get data
//show name before g= firestore , firebases, not like = human and other => 'name','<','g'
// db.collection('study').where('content','==','reactjs').orderBy('name').get().then((snapshot)=>{
    // console.log(snapshot.docs)
//     snapshot.docs.map(res=>{
//         renderStudy(res)
//     })
// })
//post data

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('study').add({
        name: form.name.value,
        content: form.content.value
    })
    form.name.value = '';
    form.content.value = '';

});

db.collection('study').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        // console.log(change.doc.data());
        if(change.type == 'added'){
            renderStudy(change.doc);
        } else if (change.type == 'removed'){
            let li = studyList.querySelector('[data-id=' + change.doc.id + ']');
            studyList.removeChild(li);
        }
    });
});
// updating records (console demo)
// db.collection('study').doc('DOgwUvtEQbjZohQNIeMr').update({
//     name: 'mario world'
// });

// db.collection('study').doc('DOgwUvtEQbjZohQNIeMr').update({
//     content: 'hong kong'
// });

// setting data
// db.collection('study').doc('DOgwUvtEQbjZohQNIeMr').set({
//     content: 'hong kong'
// });
