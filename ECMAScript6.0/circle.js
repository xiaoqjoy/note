export function area(radius) {
    return Math.PI * radius * radius;
}

export function circumference(radius) {
    return 2 * Math.PI * radius;
}

(function(){
	//此处可以看出js6转化成js5语法结构
	var fn = (index => index + 1);
	console.log(fn(2));
})()