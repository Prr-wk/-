#include <iostream>
#include <cmath>

using namespace std;

int main() {
    int i = 3, j = 1;
    for (int x = 0; x < 100; ++x) {
        while (true) {
            int sum = i*i + j*j;
            int k = static_cast<int>(sqrt(sum));
            if (k*k == sum) {
                cout << "i=" << i << " j=" << j << " x=" << k << endl;
                break;
            }
            j++;
        }
        j = 1;
        i++;
    }
    return 0;
}