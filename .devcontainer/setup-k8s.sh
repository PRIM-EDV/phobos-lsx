#!/bin/bash

sed 's/127.0.0.1/host.docker.internal/g' /root/.kube/hostconfig > /root/.kube/config