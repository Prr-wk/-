#include <iostream>
#include <string>

using namespace std;

struct aabbcc
{
    int numb;
    string name;
};

int main(){
    aabbcc abc{1, "abc"};
    cout << abc.numb << " " << abc.name << endl;
    return 0;
}