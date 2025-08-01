#include <iostream>

using namespace std;

int main(){
    cout << "Enter your first name: ";
    string str_a;
    getline(cin,str_a);
    cout<<"Enter your last name:";
    string str_b;
    getline(cin,str_b);
    cout<<"Enter your grade:";
    string str_c;
    getline(cin,str_c);
    str_c[1]++;
    cout<<"Enter your age:";
    string str_d;
    getline(cin,str_d);
    cout<<"Name:"<<str_a<<","<<str_b<<endl;
    cout<<"Grade:"<<str_c<<endl;
    cout<<"Age:"<<str_d<<endl;
    return 0;
} 