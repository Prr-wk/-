#include <iostream>
#include <cstdlib>
#include <string>
#include <sstream>

using namespace std;

int main(){
    // 定义16位数范围
    unsigned long long start = 1000000000000000ULL;  // 16位最小值
    unsigned long long end = 4000000000000000ULL;    // 16位最大值

    for (unsigned long long n = start; n <= end; ++n){
        
        string cmd = "fastboot oem unlock " + to_string(n);
        
        int result = system(cmd.c_str());

        cout << "Trying: " << n << endl;
        
        if (result == 0){
            cout << "Success with code: " << n << endl;
            break;
        }
    }
    
    return 0;
}