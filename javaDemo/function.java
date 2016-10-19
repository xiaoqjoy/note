class FunctionDemo
{
	public static void main(String[] args)
	{
		int c = add(3,5);
		System.out.println("c="+c);
		
		export();
	}
	
	public static void export()
	{
		System.out.println("hello java!");
	}
	
	public static int add(int a,int b)
	{
		return a+b;
	}
	
}