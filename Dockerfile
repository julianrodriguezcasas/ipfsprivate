VOLUME /data/ipfs/
COPY ./opt/connect.sh /data/ipfs
RUN wget -qO /usr/local/bin/ipfs https://github.com/qnib/go-ipfs/releases/download/0.4.5-pnet/ipfs-0.4.5-pnet_MuslLinux \
 && chmod +x /usr/local/bin/ipfs
ADD opt/qnib/ipfs/bin/start.sh \
    opt/qnib/ipfs/bin/check.sh \
    /opt/qnib/ipfs/bin/
RUN echo 'tail -f /var/log/ipfs.log' >> /root/.bash_history
RUN apt-get update -yq && apt-get install -yqq \
    git \
    python \