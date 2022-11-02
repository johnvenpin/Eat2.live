
function allowDropThis(i) {
    i.preventDefault();
}

function dragThis(i) {
    i.dataTransfer.setData("Dragged", i.target.id);
}

function dropThis(i) {
    i.preventDefault();
    var data = i.dataTransfer.getData("Dragged");
    var parentId = document.getElementById(data).parentNode.id;
    console.log("start");
    console.log(data);
    i.target.appendChild(document.getElementById(data));
    var parentId = document.getElementById(data).parentNode.id;
    console.log(parentId);
    if (parentId == 'right-basket') {
    addBill(parentId);
    }
    else if (parentId == 'left-basket') {
      var parentId = 'right-basket';
      addBill(parentId);
    }

}

function findElementID(id) {
       var basket = document.getElementById(id).children;
       var msg = document.getElementById('msg');
       msg.innerHTML = "";
       // Loop through all the child elements inside the parent DIV.
       for (i = 0; i <= basket.length - 1; i++) {
           msg.innerHTML = msg.innerHTML + '<p>' + basket[i].innerHTML + '</p>' ;
       }
   }

function addBill(id) {
    var billItems = document.getElementById(id).children;
    var billTotal = 0.0;
      for (let item of billItems) {
          var bill = document.getElementById(item.id).dataset.price;
          var billTotal = billTotal + parseFloat(bill);
      };


      document.getElementById("bill-total").innerHTML = "Total: £" + billTotal.toFixed(2);


        // bill.innerHTML = bill.innerHTML + '<p>' + billItems[i].innerHTML + '</p>' ;
    }



function sendFood() {
    findElementID('right-basket');


    // Check browser support
    if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem("lastname", "Smith");
      // Retrieve
      document.getElementById("result").innerHTML = localStorage.getItem("lastname");
    } else {
      document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
  }

jQuery(document).ready(function ($) {

          $('.open-popup-link').magnificPopup({
          type:'inline',
          midClick: true,
          removalDelay: 100,
          mainClass: 'mfp-fade' // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
          });


          $('.open-popup-link').magnificPopup('close').delay("2000");


  });


const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.food-containers')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
    // i.preventDefault();
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}
