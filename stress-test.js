


// webrtc stree test  


for (let i = 0; i< 200; i++) {

    console.log('==================');

    const endpointA = MediaServer.createEndpoint(endpoint.ip);
    const offerA = endpointA.createOffer(Capabilities);

    const transportB = endpoint.createTransport(offerA);
    transportB.setRemoteProperties(offerA);

    const answerB = offerA.answer({
        dtls			: transportB.getLocalDTLSInfo(),
        ice				: transportB.getLocalICEInfo(),
        candidates		: endpoint.getLocalCandidates(),
        capabilities	: Capabilities
    });

    const outgoingStreamB = transportB.createOutgoingStream({
        audio: true,
        video: true
    });

    answerB.addStream(outgoingStreamB.getStreamInfo());

    outgoingStreamB.attachTo(incomingStream);

    transportB.setLocalProperties(answerB);

    const transportA = endpointA.createTransport(offerA, answerB, {disableSTUNKeepAlive: true});


    let streamInfo = Array.from(answerB.getStreams().values())[0];

    console.log('create incoming stream', streamInfo);

    const incomingStreamA = transportA.createIncomingStream(streamInfo);
}





