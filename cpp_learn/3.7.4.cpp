#include <iostream>

using namespace std;

int main()
{
    cout<<"输入秒："; 
    int seconds;
    cin>>seconds;
    int days;
    int hours;
    int minutes;
    int seconds_left;
    days=seconds/86400;
    hours=(seconds-days*86400)/3600;
    minutes=(seconds-hours*3600-days*86400)/60;
    seconds_left=seconds-hours*3600-minutes*60-days*86400;
    cout<<seconds<<"秒="<<days<<"天"<<hours<<"小时"<<minutes<<"分钟"<<seconds_left<<"秒"<<endl;
}
