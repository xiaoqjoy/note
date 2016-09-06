public class test
{
	public static void main(String[] args)
	{
		int x = 3;
		byte c = 5;
		x = x + c;
		System.out.println(x);
		
		
		byte b = 3;
		b = (byte)(b + 4);    //强制类型转换
		System.out.println(b);
		
		
		System.out.println('a'+2);
		
		System.out.println("a"+2);
		
		System.out.println((char)('a'+2));  //unicode国际标准码表
		
		byte d = 4;
		byte d1 = 3;
		byte d2 = 8;
		
		int g;
		g = d1 + d2;
		System.out.println(g);
		
	}
}