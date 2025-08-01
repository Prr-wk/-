#include <iostream>
#include <chrono>
#include <thread>

using namespace std;

int main(){
    int * pwe= new int;
    *pwe = 114514;
    cout << pwe << endl;
    std::this_thread::sleep_for(std::chrono::seconds(20));
    return 0;
}