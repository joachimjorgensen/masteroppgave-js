def secret(x):
    n = len(x)
    y = [0]*n
    for i in range(0,n):
      	b = x[i]
        y[n-i-1] = b
    return y