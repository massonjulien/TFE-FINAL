<?php

  function imgRate($rate){
    if($rate >= 0 && $rate < 1){
      return "noStar";
    } else if($rate >= 1 && $rate < 2){
      return "oneStar";
    } else if($rate >= 2 && $rate < 3){
      return "twoStar";
    } else if($rate >= 3 && $rate < 4){
      return "threeStar";
    } else if($rate >= 4 && $rate < 5){
      return "fourStar";
    } else if($rate == 5){
      return "fiveStar";
    } else {

    }
  }

 ?>
