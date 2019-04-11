const title = new RVar(0);

RVar.autorun(() => {
    console.log(title.get());
});

RVar.autorun(() => {
    console.log("autorun 2", title.get());
});

setInterval(() => {
    title.set(title.get()+  1);
}, 1000);
