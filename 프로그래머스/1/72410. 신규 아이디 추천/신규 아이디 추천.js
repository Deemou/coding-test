function solution(new_id) {
    let id = new_id.toLowerCase();
    id = id.replace(/[^\w-.]/g, '');
    id = id.replace(/\.{2,}/g, '.');
    id = id.replace(/^\.|\.$/g, '');
    if(id === '') id = 'a';
    if(id.length >= 16) {
        id = id.slice(0,15);
        id = id.replace(/\.$/, '');
    }
    if(id.length <= 2) id = id.padEnd(3, id.at(-1));
    
    return id;
}