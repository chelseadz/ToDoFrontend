import React from 'react';

function Metrics({ todos, setterPages, pageSize}) {

  var averageLow= 0, averageMed=0, averageHigh=0, i=0, j=0,k=0;
  var total = 0;
  const calcTime = (fecha1, fecha2) =>{
    const date1 = new Date(fecha1);
    const date2 = new Date(fecha2);

    const diferenciaMilisegundos = date2 - date1;

    // const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
    // const diferenciaHoras = diferenciaMilisegundos / (1000 * 60 * 60);
    const diferenciaMinutos = diferenciaMilisegundos / (1000 * 60);

    return diferenciaMinutos;
  }

  for(const idx in todos){
    total = total+1;
    if(todos[idx].doneDate != null){
      if(todos[idx].priority === "HIGH"){
        var time = calcTime(todos[idx].creationDate, todos[idx].doneDate)
        averageHigh += time
        i+=1
      }

      if(todos[idx].priority === "MEDIUM"){
        var time1 = calcTime(todos[idx].creationDate, todos[idx].doneDate)
        averageMed += time1
        j+=1
      }

      if(todos[idx].priority === "LOW"){
        var time2 = calcTime(todos[idx].creationDate, todos[idx].doneDate)
        averageLow += time2
        k+=1
      }

    }
  }
  
  setterPages(Math.ceil(total/pageSize));

  return (
    <div class="average-time-container">
    <div class="average-time-section">
        <p>Average time to finish tasks:</p>
        <strong> {((averageLow+averageMed+averageHigh)/3).toFixed(5)} minutes</strong>
    </div>
    <div class="priority-time-section">
        <p>Average time to finish tasks by priority:</p>
        <ul>
            <li>Low: {k>0 ? (averageLow/k).toFixed(5) : 0} mins</li>
            <li>Medium: {j>0 ? (averageMed/j).toFixed(5) : 0} mins</li>
            <li>High: {i>0 ? (averageHigh/i).toFixed(5) : 0} mins</li>
        </ul>
    </div>
</div>
  );
}

export default Metrics;
