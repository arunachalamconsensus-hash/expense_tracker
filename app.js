let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction(){
  let text = document.getElementById("text").value;
  let amount = +document.getElementById("amount").value;

  if(text==="" || amount===0) return alert("Enter valid data!");

  transactions.push({text,amount});
  localStorage.setItem("transactions",JSON.stringify(transactions));

  document.getElementById("text").value="";
  document.getElementById("amount").value="";

  render();
}

function render(){
  let list = document.getElementById("list");
  let income = 0, expense = 0;
  list.innerHTML="";

  transactions.forEach((t,i)=>{
    let li = document.createElement("li");
    li.className = t.amount>0?"plus":"minus";
    li.innerHTML = `${t.text} <span>₹${t.amount}</span>
    <button onclick="deleteTrans(${i})">X</button>`;
    list.appendChild(li);

    if(t.amount>0) income+=t.amount;
    else expense+=t.amount;
  });

  document.getElementById("income").innerText = "₹"+income;
  document.getElementById("expense").innerText = "₹"+Math.abs(expense);
  document.getElementById("balance").innerText = "₹"+(income+expense);
}

function deleteTrans(index){
  transactions.splice(index,1);
  localStorage.setItem("transactions",JSON.stringify(transactions));
  render();
}

render();
