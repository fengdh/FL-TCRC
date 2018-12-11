d3.json('data.json', (list) => {
    var sorter = (a,b) => a['adjusted-pace'] < b['adjusted-pace'] ? -1 : 1;
	var all = list.reduce( (c, d) => 
		(d.members
		  .filter(m => m.gender)
		  .forEach(m => m.gender==='F' ? c.female.push(m) : c.male.push(m)), c), 
         {female:[], male:[]}
		);
	all.male.sort(sorter);
    all.female.sort(sorter);
    console.table(all.male);
    console.table(all.female);
})
