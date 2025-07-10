#include <iostream>

using namespace std;

int main()
{
    double height;//厘米
    double weight;//斤
    cin>>height;
    cin>>weight;
    cout<<"你的身高是"<<height/100<<"米"<<endl;
    cout<<"你的体重是"<<weight/2<<"千克"<<endl;
    double BMI=weight/(height*height);  
    cout<<"你的BMI指数是"<<BMI<<endl;
    return 0;    
}
