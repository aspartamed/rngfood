import React, { useState, useMemo, useEffect } from 'react';

// Restaurant data sourced from our conversation
// Addresses are placeholders and should be verified for accuracy
const restaurantData = [
  { name: "A-Aki Sushi & Steakhouse", cuisine: "Japanese", address: "1400 Tuskawilla Rd, Winter Springs, FL 32708", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=A-Aki+Sushi+%26+Steakhouse+1400+Tuskawilla+Rd,+Winter+Springs,+FL+32708" },
  { name: "Al Bacio - Pizza & Pasta", cuisine: "Italian", address: "931 Lockwood Blvd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Al+Bacio+-+Pizza+%26+Pasta+931+Lockwood+Blvd,+Oviedo,+FL+32765" },
  { name: "Alex's Fresh Kitchen", cuisine: "American", address: "1015 Lockwood Blvd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Alex's+Fresh+Kitchen+1015+Lockwood+Blvd,+Oviedo,+FL+32765" },
  { name: "Ana's Brazilian Kitchen", cuisine: "Brazilian", address: "37 E Broadway St, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Ana's+Brazilian+Kitchen+37+E+Broadway+St,+Oviedo,+FL+32765" },
  { name: "Applebee's Grill & Bar", cuisine: "American", address: "1170 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Applebee's+Grill+%26+Bar+1170+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Arby's", cuisine: "Fast Food", address: "1990 W State Rd 426, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Arby's+1990+W+State+Rd+426,+Oviedo,+FL+32765" },
  { name: "Beef 'O' Brady's", cuisine: "American", address: "1817 E Broadway St, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Beef+'O'+Brady's+1817+E+Broadway+St,+Oviedo,+FL+32765" },
  { name: "Big Taco", cuisine: "Mexican", address: "195 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Big+Taco+195+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Bolay", cuisine: "Healthy", address: "419 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Bolay+419+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "BENTO Asian Kitchen + Sushi", cuisine: "Asian", address: "42 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=BENTO+Asian+Kitchen+%2B+Sushi+42+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "BurgerFi", cuisine: "American", address: "8131 Red Bug Lake Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=BurgerFi+8131+Red+Bug+Lake+Rd,+Oviedo,+FL+32765" },
  { name: "Burger King", cuisine: "Fast Food", address: "1930 W State Rd 426, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Burger+King+1930+W+State+Rd+426,+Oviedo,+FL+32765" },
  { name: "Buttercrust Pizza", cuisine: "Pizza", address: "888 City Walk Ln, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Buttercrust+Pizza+888+City+Walk+Ln,+Oviedo,+FL+32765" },
  { name: "Cafe Panuzzo's", cuisine: "Italian", address: "1003 Lockwood Blvd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Cafe+Panuzzo's+1003+Lockwood+Blvd,+Oviedo,+FL+32765" },
  { name: "Checkers", cuisine: "Fast Food", address: "30 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Checkers+30+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Chick-fil-A", cuisine: "Fast Food", address: "32 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Chick-fil-A+32+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Chili's Grill & Bar", cuisine: "American", address: "1150 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Chili's+Grill+%26+Bar+1150+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Chipotle Mexican Grill", cuisine: "Mexican", address: "327 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Chipotle+Mexican+Grill+327+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Culver's", cuisine: "American", address: "889 W Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Culver's+889+W+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Cup of Love Cafe", cuisine: "Cafe", address: "201 Alafaya Woods Blvd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Cup+of+Love+Cafe+201+Alafaya+Woods+Blvd,+Oviedo,+FL+32765" },
  { name: "Dairy Queen Grill & Chill", cuisine: "Fast Food", address: "1455 W Broadway St, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Dairy+Queen+Grill+%26+Chill+1455+W+Broadway+St,+Oviedo,+FL+32765" },
  { name: "Domino's Pizza", cuisine: "Pizza", address: "84 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Domino's+Pizza+84+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Einstein Bros. Bagels", cuisine: "Cafe", address: "195 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Einstein+Bros.+Bagels+195+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Firehouse Subs", cuisine: "Sandwiches", address: "155 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Firehouse+Subs+155+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "First Watch", cuisine: "Breakfast", address: "912 City Walk Ln, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=First+Watch+912+City+Walk+Ln,+Oviedo,+FL+32765" },
  { name: "Five Guys", cuisine: "American", address: "1118 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Five+Guys+1118+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Ford's Garage", cuisine: "American", address: "459 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Ford's+Garage+459+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Gator's Dockside", cuisine: "American", address: "1165 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Gator's+Dockside+1165+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Gino's Italian Restaurant & Pizza", cuisine: "Italian", address: "43 Alafaya Woods Blvd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Gino's+Italian+Restaurant+%26+Pizza+43+Alafaya+Woods+Blvd,+Oviedo,+FL+32765" },
  { name: "Git-N-Messy BBQ", cuisine: "BBQ", address: "1881 W State Rd 426, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Git-N-Messy+BBQ+1881+W+State+Rd+426,+Oviedo,+FL+32765" },
  { name: "Habaneros Mexican Grill", cuisine: "Mexican", address: "829 Eyrie Dr, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Habaneros+Mexican+Grill+829+Eyrie+Dr,+Oviedo,+FL+32765" },
  { name: "Hong Kong Alleys Kitchen", cuisine: "Chinese", address: "1977 Alafaya Trail, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Hong+Kong+Alleys+Kitchen+1977+Alafaya+Trail,+Oviedo,+FL+32765" },
  { name: "Hungry Howie's Pizza", cuisine: "Pizza", address: "81 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Hungry+Howie's+Pizza+81+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "IHOP", cuisine: "Breakfast", address: "1150 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=IHOP+1150+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Jersey Mike's Subs", cuisine: "Sandwiches", address: "425 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Jersey+Mike's+Subs+425+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Jimmy John's", cuisine: "Sandwiches", address: "1163 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Jimmy+John's+1163+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Kai Asian Street Fare", cuisine: "Asian", address: "888 City Walk Ln, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Kai+Asian+Street+Fare+888+City+Walk+Ln,+Oviedo,+FL+32765" },
  { name: "Keke's Breakfast Cafe", cuisine: "Breakfast", address: "110 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Keke's+Breakfast+Cafe+110+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "KFC", cuisine: "Fast Food", address: "1980 W State Rd 426, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=KFC+1980+W+State+Rd+426,+Oviedo,+FL+32765" },
  { name: "Little Caesars", cuisine: "Pizza", address: "20 Alafaya Woods Blvd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Little+Caesars+20+Alafaya+Woods+Blvd,+Oviedo,+FL+32765" },
  { name: "Maple Street Biscuit Company", cuisine: "Breakfast", address: "8131 Red Bug Lake Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Maple+Street+Biscuit+Company+8131+Red+Bug+Lake+Rd,+Oviedo,+FL+32765" },
  { name: "Marco's Pizza", cuisine: "Pizza", address: "1809 E Broadway St, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Marco's+Pizza+1809+E+Broadway+St,+Oviedo,+FL+32765" },
  { name: "Marlow's Tavern", cuisine: "American", address: "1295 W Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Marlow's+Tavern+1295+W+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "McDonald's", cuisine: "Fast Food", address: "1605 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=McDonald's+1605+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Mellow Mushroom", cuisine: "Pizza", address: "3122 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Mellow+Mushroom+3122+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Metro Diner", cuisine: "Diner", address: "870 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Metro+Diner+870+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Miller's Ale House", cuisine: "American", address: "312 W Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Miller's+Ale+House+312+W+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Mission BBQ", cuisine: "BBQ", address: "1061 Alafaya Trail, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Mission+BBQ+1061+Alafaya+Trail,+Oviedo,+FL+32765" },
  { name: "Miyako Sushi & Hibachi", cuisine: "Japanese", address: "2871 Clayton Crossing Way, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Miyako+Sushi+%26+Hibachi+2871+Clayton+Crossing+Way,+Oviedo,+FL+32765" },
  { name: "Moe's Southwest Grill", cuisine: "Mexican", address: "1112 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Moe's+Southwest+Grill+1112+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Moma's Cafe", cuisine: "Cafe", address: "189 N Central Ave, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Moma's+Cafe+189+N+Central+Ave,+Oviedo,+FL+32765" },
  { name: "Outback Steakhouse", cuisine: "Steakhouse", address: "1161 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Outback+Steakhouse+1161+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Oviedo Brewing Company", cuisine: "Brewery", address: "935 City Walk Ln, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Oviedo+Brewing+Company+935+City+Walk+Ln,+Oviedo,+FL+32765" },
  { name: "Panera Bread", cuisine: "Cafe", address: "205 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Panera+Bread+205+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Papa Johns Pizza", cuisine: "Pizza", address: "200 W Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Papa+Johns+Pizza+200+W+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Pei Wei Asian Kitchen", cuisine: "Asian", address: "100 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Pei+Wei+Asian+Kitchen+100+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Phở an & Herb", cuisine: "Vietnamese", address: "19 Alafaya Woods Blvd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Phở+an+%26+Herb+19+Alafaya+Woods+Blvd,+Oviedo,+FL+32765" },
  { name: "Pickles BBQ", cuisine: "BBQ", address: "1875 W State Rd 426, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Pickles+BBQ+1875+W+State+Rd+426,+Oviedo,+FL+32765" },
  { name: "Pizza Hut", cuisine: "Pizza", address: "1875 W County Road 419, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Pizza+Hut+1875+W+County+Road+419,+Oviedo,+FL+32765" },
  { name: "Poblano's Mexican Grill", cuisine: "Mexican", address: "5414 Deep Lake Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Poblano's+Mexican+Grill+5414+Deep+Lake+Rd,+Oviedo,+FL+32765" },
  { name: "Popeyes Louisiana Kitchen", cuisine: "Fast Food", address: "193 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Popeyes+Louisiana+Kitchen+193+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Qdoba Mexican Eats", cuisine: "Mexican", address: "4210 Alafaya Trail, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Qdoba+Mexican+Eats+4210+Alafaya+Trail,+Oviedo,+FL+32765" },
  { name: "Raising Cane's Chicken Fingers", cuisine: "Fast Food", address: "4075 N Alafaya Trail, Orlando, FL 32826", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Raising+Cane's+Chicken+Fingers+4075+N+Alafaya+Trail,+Orlando,+FL+32826" },
  { name: "Ramen Takagi", cuisine: "Japanese", address: "4270 Aloma Ave, Winter Park, FL 32792", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Ramen+Takagi+4270+Aloma+Ave,+Winter+Park,+FL+32792" },
  { name: "Rock & Brews", cuisine: "American", address: "7131 Red Bug Lake Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Rock+%26+Brews+7131+Red+Bug+Lake+Rd,+Oviedo,+FL+32765" },
  { name: "Sakari Sushi", cuisine: "Japanese", address: "81 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Sakari+Sushi+81+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Salsas Cocina Mexicana", cuisine: "Mexican", address: "48 W Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Salsas+Cocina+Mexicana+48+W+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Sonny's BBQ", cuisine: "BBQ", address: "190 W Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Sonny's+BBQ+190+W+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Spice Indian Grill", cuisine: "Indian", address: "1977 Alafaya Trail, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Spice+Indian+Grill+1977+Alafaya+Trail,+Oviedo,+FL+32765" },
  { name: "Sprouts Farmers Market (deli)", cuisine: "Deli", address: "1121 Alafaya Trail, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Sprouts+Farmers+Market+1121+Alafaya+Trail,+Oviedo,+FL+32765" },
  { name: "Steak 'n Shake", cuisine: "American", address: "110 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Steak+'n'+Shake+110+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Subway", cuisine: "Sandwiches", address: "1875 W County Road 419, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Subway+1875+W+County+Road+419,+Oviedo,+FL+32765" },
  { name: "Sushi Pop", cuisine: "Japanese", address: "8131 Red Bug Lake Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Sushi+Pop+8131+Red+Bug+Lake+Rd,+Oviedo,+FL+32765" },
  { name: "Taco Bell", cuisine: "Fast Food", address: "1859 W County Road 419, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Taco+Bell+1859+W+County+Road+419,+Oviedo,+FL+32765" },
  { name: "Tabla Indian Restaurant", cuisine: "Indian", address: "931 Lockwood Blvd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Tabla+Indian+Restaurant+931+Lockwood+Blvd,+Oviedo,+FL+32765" },
  { name: "Teriyaki Madness", cuisine: "Asian", address: "441 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Teriyaki+Madness+441+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "The Food Factory", cuisine: "Food Hall", address: "888 City Walk Ln, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=The+Food+Factory+888+City+Walk+Ln,+Oviedo,+FL+32765" },
  { name: "The Local Hen", cuisine: "American", address: "888 City Walk Ln, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=The+Local+Hen+888+City+Walk+Ln,+Oviedo,+FL+32765" },
  { name: "The Town House Restaurant", cuisine: "Diner", address: "139 N Central Ave, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=The+Town+House+Restaurant+139+N+Central+Ave,+Oviedo,+FL+32765" },
  { name: "Tijuana Flats", cuisine: "Mexican", address: "100 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Tijuana+Flats+100+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Torchy's Tacos", cuisine: "Mexican", address: "8131 Red Bug Lake Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Torchy's+Tacos+8131+Red+Bug+Lake+Rd,+Oviedo,+FL+32765" },
  { name: "Torino's Pizza & Italian Restaurant", cuisine: "Italian", address: "2871 Clayton Crossing Way, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Torino's+Pizza+%26+Italian+Restaurant+2871+Clayton+Crossing+Way,+Oviedo,+FL+32765" },
  { name: "Tropical Smoothie Cafe", cuisine: "Cafe", address: "195 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Tropical+Smoothie+Cafe+195+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Waffle House", cuisine: "Diner", address: "1960 W State Rd 426, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Waffle+House+1960+W+State+Rd+426,+Oviedo,+FL+32765" },
  { name: "Wendy's", cuisine: "Fast Food", address: "90 W Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Wendy's+90+W+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Whataburger", cuisine: "Fast Food", address: "1151 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Whataburger+1151+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Wingstop", cuisine: "Wings", address: "100 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Wingstop+100+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
  { name: "Yao's Modern Kitchen", cuisine: "Chinese", address: "15 Alafaya Woods Blvd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Yao's+Modern+Kitchen+15+Alafaya+Woods+Blvd,+Oviedo,+FL+32765" },
  { name: "Zaxby's Chicken Fingers & Buffalo Wings", cuisine: "Fast Food", address: "1155 E Mitchell Hammock Rd, Oviedo, FL 32765", googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Zaxby's+Chicken+Fingers+%26+Buffalo+Wings+1155+E+Mitchell+Hammock+Rd,+Oviedo,+FL+32765" },
];

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
);


const App = () => {
    useEffect(() => {
        document.title = "Oviedo Eats Picker";
    }, []);

    const [restaurants] = useState(restaurantData);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const cuisineCounts = useMemo(() => {
        const counts = {};
        restaurants.forEach(r => {
            counts[r.cuisine] = (counts[r.cuisine] || 0) + 1;
        });
        return counts;
    }, [restaurants]);

    const [selectedCuisines, setSelectedCuisines] = useState(() => 
        Object.keys(cuisineCounts)
    );
    
    const handleFilterChange = (cuisine) => {
        setSelectedCuisines(prev => 
            prev.includes(cuisine) 
                ? prev.filter(c => c !== cuisine) 
                : [...prev, cuisine]
        );
    };

    const filteredRestaurants = useMemo(() => {
        return restaurants.filter(r => selectedCuisines.includes(r.cuisine));
    }, [restaurants, selectedCuisines]);

    const handleRandomSelect = () => {
        if (filteredRestaurants.length === 0) {
            return;
        }
        setIsLoading(true);
        setSelectedRestaurant(null);

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * filteredRestaurants.length);
            setSelectedRestaurant(filteredRestaurants[randomIndex]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="font-sans bg-gray-900 text-white flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md mx-auto relative">
                 <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition-colors"
                    aria-label="Open settings"
                >
                    <SettingsIcon />
                </button>
                <div className="bg-gray-800 shadow-2xl rounded-2xl p-6 md:p-8 text-center border border-gray-700">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-cyan-400">
                        Oviedo Eats Picker
                    </h1>
                    <p className="text-gray-400 mb-6">
                        Can't decide where to eat? Let fate choose!
                    </p>

                    <div className="mt-8 mb-8">
                        <button
                            onClick={handleRandomSelect}
                            disabled={isLoading || filteredRestaurants.length === 0}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold py-4 px-6 rounded-xl text-xl transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            {isLoading ? 'Finding a place...' : 'Find a Place to Eat!'}
                        </button>
                         {filteredRestaurants.length === 0 && <p className="text-yellow-400 text-sm mt-2">Please select a cuisine in settings.</p>}
                    </div>

                    {isLoading && (
                        <div className="flex justify-center items-center h-48">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-400"></div>
                        </div>
                    )}

                    {selectedRestaurant && (
                        <div className="bg-gray-900/50 rounded-xl p-6 animate-fade-in mt-6 border border-gray-700">
                            <h2 className="text-2xl font-bold text-yellow-400">
                                {selectedRestaurant.name}
                            </h2>
                            <p className="text-gray-400 text-sm mb-4 bg-gray-700/50 inline-block px-3 py-1 rounded-full mt-2">
                                {selectedRestaurant.cuisine}
                            </p>
                            <div className="text-left mt-4 space-y-3">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 mr-3 mt-1 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    <p className="text-gray-300">{selectedRestaurant.address}</p>
                                </div>
                            </div>
                            <a
                                href={selectedRestaurant.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-block w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                Navigate
                            </a>
                        </div>
                    )}
                </div>
                <p className="text-center text-gray-600 text-xs mt-4">
                    Disclaimer: Restaurant addresses are for general reference.
                </p>
            </div>

            {isSettingsOpen && (
                 <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in-fast">
                    <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col border border-gray-700">
                       <div className="p-6 border-b border-gray-700">
                         <h2 className="text-2xl font-bold text-cyan-400">Filter Cuisines</h2>
                         <p className="text-gray-400">Select which types of food to include.</p>
                       </div>
                       <div className="p-6 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(cuisineCounts).sort(([a], [b]) => a.localeCompare(b)).map(([cuisine, count]) => (
                                    <label key={cuisine} className="flex items-center space-x-3 bg-gray-900/50 p-3 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedCuisines.includes(cuisine)}
                                            onChange={() => handleFilterChange(cuisine)}
                                            className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-600"
                                        />
                                        <span className="text-gray-300">{cuisine} <span className="text-gray-500">({count})</span></span>
                                    </label>
                                ))}
                            </div>
                       </div>
                        <div className="p-4 border-t border-gray-700 mt-auto">
                            <button
                                onClick={() => setIsSettingsOpen(false)}
                                className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                 </div>
            )}

            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
                    body { margin: 0; }
                    .font-sans { font-family: 'Inter', sans-serif; }
                    @keyframes fade-in {
                      from { opacity: 0; transform: translateY(10px); }
                      to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes fade-in-fast {
                      from { opacity: 0; }
                      to { opacity: 1; }
                    }
                    .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
                    .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
                `}
            </style>
        </div>
    );
};

export default App;
