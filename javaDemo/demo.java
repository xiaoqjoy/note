/**

//Java专用注释符（文档注释）

第一步先写注释（需求），写js也是如此，高手的涵养。
（
思路：
1、定义一个类，因为Java程序都定义类中，Java程序都是以类的形势存在，类的形势其实就是一个字节码文件最终体现。
2、定义一个主函数。为了让该类可以独立运行。


步骤：
1、用class关键字来完成类的定义，并起一个阅读性强的类名。
2、主函数：public static void main(String[] args)这是固定格式的。jvm认识

代码仅仅是思想的一种体现形式。 
）
*/


//主函数格式
class Demo
{
	public static void main(String[] agrs)
	{
		//数据类型   变量名 = 初始化值
		byte	b = 3;
		
		short   s = 4000;
		
		int     x = 12;
		
		long    l = 123456484145l;
		
		float   f = 2.3f;
		
		double  d = 3.4;
		
		char    ch = 'a';
		
		boolean  bl = true;
		bl = false; 
		
		{
			int z = 9;
			System.out.println(z);
			
		}
		
		//System.out.println(z);     //作用域
		
		System.out.println(l+"----"+f+"-----"+ch+"-----"+bl);
		
		
		
		
		
		
		
	}
}