class varDemo
{
	public static void main(String[] args)
	{
		int x = 3;
		byte c = 5;
		x = x + c;
		 
		System.out.println(x);
		
		byte b = 3;
		b = (byte)(b + 4);   //强制类型转换
		System.out.println(b);
		
		
	}
}