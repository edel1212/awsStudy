# VPC(Virtual Private Cloud)

![alt text](image.png)
- AWS 계정 전용 가상 네트워크 (가상의 데이터 센터)
    - 대부분의 리소스는 외부에서 접근이 가능하다 VPR는 원칙적으로 외부에서 접근이 불가능하다.
- AWS 클라우드에서 다른 가상 네트워크와 논리적으로 분리 되어 있다.
    - AWS 내부의 리소스끼리라도 VPC내에 있다면 직접적으로 연결이 불가능하다
        - `EC2`가 외부망에서 접근이 가능한 이유는 GateWay가 중간에 있기 때문이다.
- 외부에 격리된 너트워크 컨테이너 구성 가능( ℹ Docker 컨테이너가 아님 )
    - 원하는 대로 사설망 구축 가능
        - 부여된 IP대역을 분할하여 사용하는 방식
- 지역(`Region`)단위이다.
- 활용 방법
    - EC2, RDS, Lambda 등의 AWS 컴퓨팅 서비스 실행
    - 다양한 서브넷 구성
    - 보안 설정(외부에 노출되지 않는 EC2 구성)

## VPC 구성 요소
- 서브넷
- 인터넷 게이트웨이
- NACL/보안그룹
- 라우트 테이블
- NAT Instnace / NAT Gateway
- Bastion Host
- VPC Endpoint


### 서브넷(Subnet)
![alt text](image-1.png)
- VPC의 하위 단위로 VOC에 할당된 IP를 더 작은 단위로 분할한 개념
- 👍 하나의 서브넷은 하나의 가용영역(AZ)안에 위치한다.
- CIDR block range로 IP 주소를 지정
- 사용 가능한 IP개수
    - 👍 CIDR을 적용한 IP 주소에서 5개를 제외하고 계산
        - `x.x.x.0` :  네트워크 어드레스
        - `x.x.x.1` :  VPC Router
        - `x.x.x.2` :  DNS Server
        - `x.x.x.3` :  여분용
        - `x.x.x.255` :  브로트 케스트 어드레스 (단 브로드케스트를 지원하진 않음)

