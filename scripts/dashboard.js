import { circularGraph, generateBarChart } from "./graphs.js";
if (localStorage.getItem("Token") === null) {
  window.location.href = "index.html";
}
console.log(localStorage.getItem("Token") === null);

document.querySelector('.logout').addEventListener('click',()=>{
  localStorage.clear()
  window.location.href = "index.html";
})

async function testQuery() {
  console.log(localStorage.getItem("Token"));

  const getUserQuery = () => `
        query {
            user {
              firstName
              lastName
              totalUp
              totalDown
              campus
              email
              login
              events(where: {event: {path: {_ilike:"%div-01"}}}) {
                level
              }
              transactions_aggregate(
                where: {event: {path: {_ilike: "/dakar/div-01"}}, _and: {type: {_eq: "xp"}}}
              ) {
                aggregate {
                  sum {
                    amount
                  }
                }
              }
              progresses_aggregate(
                distinct_on: [objectId]
                where: {isDone: {_eq: true}, object: {type: {_eq: "project"}}}
              ) {
                aggregate {
                  count
                }
              }
              transactions(where:{event:{path:{_ilike:"/dakar/div-01"}},object:{type:{_eq:"project"}},type:{_eq:"xp"}}){
                amount
                path
                
              }
            }
          }`;

  try {
    const response = await fetch(
      "https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: getUserQuery() }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const navTitle = document.querySelector(".nav-title");
    const username = document.querySelector("#username");
    const fullName = document.querySelector("#fullName");
    const email = document.querySelector("#email");
    
    navTitle.textContent +=
    data.data.user[0].firstName + " " + data.data.user[0].lastName;
    username.textContent += data.data.user[0].login;
    fullName.textContent +=
    data.data.user[0].firstName + " " + data.data.user[0].lastName;
    email.textContent += data.data.user[0].email;
    
    if (data.data.user[0].campus!==null) {
      const campus = document.querySelector("#campus");
      const level = document.querySelector(".level-value");
      const xp = document.querySelector(".xp-value");
      const progress = document.querySelector(".project-done-value-span");
      campus.textContent += data.data.user[0].campus;
      level.textContent += data.data.user[0].events[0].level;
    xp.textContent =
    Math.floor(
        data.data.user[0].transactions_aggregate.aggregate.sum.amount / 1000
        ) + xp.textContent;
        progress.textContent = data.data.user[0].transactions.length
        console.log(data.data.user);
        console.log(data.data.user[0].firstName, data.data.user[0].lastName);
        generateBarChart(data.data.user[0].transactions)
    const totalValueOfCircleGraph=data.data.user[0].totalUp+data.data.user[0].totalDown
    const valueOfCircleGraph=[
      {label:"Done",value:(data.data.user[0].totalUp/totalValueOfCircleGraph)*100,color:"#2e9a28"},
      {label:"Received",value:(data.data.user[0].totalDown/totalValueOfCircleGraph)*100,color:"#b41414"}
    ]
    circularGraph(valueOfCircleGraph)
    }
  } catch (error) {
    console.error("Query failed:", error.message);
  }
}

testQuery();
