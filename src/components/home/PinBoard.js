import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'

function PinBoard() {
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 500 }}>
      <CardHeader
        title="Pined Posts"
      ></CardHeader>

      <CardContent>
        <Typography variant="body2">
          Assassin's Creed fan, museum lover. 🍉 is my ultimate favorite fruit.
        </Typography>
      </CardContent>
      
    </Card>
  )
}

export default PinBoard
