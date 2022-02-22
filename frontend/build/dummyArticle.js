{
    id: 4,
    title: 'Installing Docker in Kali Linux 2018.1 and 2019.2'
    content: `This is a quick guide on how to install proper Docker CE in Kali Linux 2018.1 and 2019.2.

This guide is based on official Docker documentation (https://docs.docker.com/install/linux/docker-ce/debian/).
Preparation

Add Docker pgp key:

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -

Configure Docker apt repository:

echo 'deb https://download.docker.com/linux/debian stretch stable' > /etc/apt/sources.list.d/docker.list

Update :

apt-get update

Install Docker

As we want a clean installation, what we do is verify that there are no obseleta versions and we give it:

apt-get remove docker docker-engine docker.io

Install Docker:

apt-get install docker-ce

Verify if it was installed correctly

docker run hello-world

Watch the version

Full format:

docker version

Specific format:

docker version --format '{{.Server.Version}}'        
    `
}
