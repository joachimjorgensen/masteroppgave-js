def myst3(A,x):
	for r in range(0,len(A)):
		for c in range(0,len(A[0])):
			if(A[r][c]==x):
				return r*c
	return 0