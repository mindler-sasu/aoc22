print(sum(int("417852396"[ord(i)-65::3][ord(j)-88])for[i,_,j,_]in open("2").readlines()))
