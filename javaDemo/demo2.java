/**
          ^    异或
	 true ^ true = false;
	 true ^ false = true;
	 false ^ true = true;
	 false ^ false = false;
	 
	 
	 
	 位运算符
*/

class demo2
{
	public static void main(String[] args)
	{
		System.out.println(3>2);
		
		int a = 3;
		
		System.out.println(a<5 ^ a>1);
		
		System.out.println(6&3);
		//与运算
		
		System.out.println(6|3);
		//或运算
		
		System.out.println(~6);
		//反码

				
	}
}